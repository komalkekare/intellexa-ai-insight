from langchain_google_genai import ChatGoogleGenerativeAI
import os
import pandas as pd
from sqlalchemy import create_engine
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import create_sql_agent
import warnings
from datetime import datetime
import numpy as np

class CSV_SQLAgent:
    def __init__(self, llm=None, csv_files=None, db_path="doc.db"):
        if not llm:
            warnings.warn("LLM (Language Model) is not set. Please provide a valid LLM instance.")
        self.llm = llm
        self.csv_files = csv_files if csv_files else []
        self.db_path = db_path
        self.engine = create_engine(self.db_path)
        print(f"Database will be saved as: {os.path.abspath('cio.db')}")
        self.db = SQLDatabase(engine=self.engine)

    def load_data_to_db(self):
        if not self.engine:
            raise ValueError("Database engine is not initialized. Please provide a valid db_path.")
        
        for csv_file in self.csv_files:
            table_name = os.path.splitext(os.path.basename(csv_file))[0]
            try:
                # First try reading with default settings
                df = pd.read_csv(csv_file)
            except pd.errors.ParserError:
                # If that fails, try with error_bad_lines=False (skip problematic rows)
                print(f"Warning: Found parsing errors in {csv_file}. Attempting to load with error handling...")
                df = pd.read_csv(
                    csv_file,
                    on_bad_lines='skip',  # Skip problematic lines
                    encoding='utf-8',     # Explicitly set encoding
                    low_memory=False      # Disable low memory warnings
                )
                print(f"Successfully loaded {len(df)} rows from {csv_file}")
            
            # Apply specific cleaning based on table name
            if 'incident' in table_name.lower():
                df = self.load_and_clean_incident_csv(df)
            elif table_name.lower() == "applications":
                df = self.load_and_clean_applications_csv(df)
                
            # Save to database
            df.to_sql(table_name, self.engine, index=False, if_exists="replace")
            print(f"Saved {len(df)} rows to table {table_name}")
    
    def load_and_clean_applications_csv(self, csv_file_path):
        """ Custom cleaning logic for the applications CSV file """
        df = pd.read_csv(csv_file_path)
        print(f"Cleaning applications file: {csv_file_path} with {len(df)} rows")
        
        # Example: Clean specific columns (You can add any transformations or checks as needed)
        if 'application_name' in df.columns:
            df['application_name'] = df['application_name'].apply(self.clean_string, max_length=100)

        if 'application_id' in df.columns:
            df['application_id'] = df['application_id'].apply(self.clean_int)
        
        # More cleaning steps specific to applications
        return df

    def load_and_clean_incident_csv(self, csv_file_path):
        """ Custom cleaning logic for the incidents CSV file """
        df = pd.read_csv(csv_file_path)
        print(f"Cleaning incident file: {csv_file_path} with {len(df)} rows")

        if 'sla_adherance_percentage' in df.columns:
            df['sla_adherance_percentage'] = df['sla_adherance_percentage'].apply(
                lambda x: self.clean_numeric(x, 'sla_adherance_percentage'))

        date_cols = ['currentDate', 'estimated_completion_date', 'first_assignment_time',
                     'first_responded', 'last_update', 'opened_date', 'resolved_date']
        for col in date_cols:
            if col in df.columns:
                df[col] = df[col].apply(self.clean_date)

        int_cols = ['business_resolve_time', 'days_open', 'days_since_last_update',
                    'project_number', 'resolve_time', 'resolved_year', 'year_of_first_response']
        for col in int_cols:
            if col in df.columns:
                df[col] = df[col].apply(self.clean_int)

        float_cols = ['business_days_to_first_assignment', 'days_to_resolved',
                      'efforts_in_hrs', 'mttr_calculated', 'response_calculated', 'ttr']
        for col in float_cols:
            if col in df.columns:
                df[col] = df[col].apply(self.clean_numeric)

        enum_cols = ['escalated', 'welcome_season_flag']
        for col in enum_cols:
            if col in df.columns:
                df[col] = df[col].apply(self.clean_enum)

        if 'pbm_sales_force_client' in df.columns:
            df['pbm_sales_force_client'] = df['pbm_sales_force_client'].apply(
                lambda x: self.clean_string(x, 255, 'pbm_sales_force_client'))

        return df

    # Utility cleaning functions
    def clean_date(self, date_str):
        if pd.isna(date_str) or str(date_str).strip() == '' or str(date_str).lower() == 'none':
            return None
        try:
            return pd.to_datetime(date_str).strftime('%Y-%m-%d %H:%M:%S')
        except:
            return None

    def clean_numeric(self, value, column_name=None):
        if column_name == 'sla_adherance_percentage':
            if pd.isna(value) or str(value).strip() == '' or str(value).lower() == 'none':
                return None
            try: 
                return float(str(value).strip().replace('%', ''))
            except:
                return None
        if pd.isna(value) or str(value).strip() == '' or str(value).lower() == 'none':
            return None
        try:
            return float(value)
        except:
            return None

    def clean_int(self, value):
        if pd.isna(value) or str(value).strip() == '' or str(value).lower() == 'none':
            return None
        try:
            cleaned = float(value)
            return int(cleaned) if cleaned.is_integer() else None
        except:
            return None

    def clean_string(self, value, max_length=None, column_name=None):
        if column_name == 'pbm_sales_force_client':
            if pd.isna(value) or str(value).strip().lower() == 'none':
                return "None"
            cleaned = str(value).strip()
            return cleaned if cleaned else None

        if pd.isna(value) or str(value).strip() == '' or str(value).lower() == 'none':
            return None
        cleaned = str(value).strip()
        if max_length and len(cleaned) > max_length:
            return cleaned[:max_length]
        return cleaned

    def clean_enum(self, value, valid_values=['Yes', 'No', 'FALSE']):
        if pd.isna(value) or str(value).strip() == '' or str(value).lower() == 'none':
            return None
        cleaned = str(value).strip()
        return cleaned if cleaned in valid_values else None


# Usage:
agent = CSV_SQLAgent(csv_files=[
    "C:\\Users\\komal.kekare\\projects\\intellexa-ai-insight\\backend\\Human-Resource-Management.pdf"

])

agent.load_data_to_db()
