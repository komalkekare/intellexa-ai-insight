import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// AI-specific colors
				chat: {
					user: 'hsl(var(--chat-user))',
					ai: 'hsl(var(--chat-ai))',
					system: 'hsl(var(--chat-system))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					glow: 'hsl(var(--success-glow))'
				},
				warning: 'hsl(var(--warning))',
				info: 'hsl(var(--info))'
			},
			backgroundImage: {
				'ai-gradient': 'var(--ai-gradient-primary)',
				'ai-secondary': 'var(--ai-gradient-secondary)',
				'ai-accent': 'var(--ai-gradient-accent)'
			},
			boxShadow: {
				'ai': 'var(--shadow-ai)',
				'glass': 'var(--shadow-glass)',
				'float': 'var(--shadow-float)'
			},
			transitionTimingFunction: {
				'ai': 'cubic-bezier(0.23, 1, 0.32, 1)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				// AI-specific animations
				'ai-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' 
					}
				},
				'typing': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'fade-slide-up': {
					'0%': { 
						opacity: '0', 
						transform: 'translateY(20px)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'translateY(0)' 
					}
				},
				'glow': {
					'0%, 100%': { 
						filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))' 
					},
					'50%': { 
						filter: 'drop-shadow(0 0 25px hsl(var(--primary) / 0.8))' 
					}
				},
				'success-bounce': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.2)' },
					'100%': { transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'ai-pulse': 'ai-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'typing': 'typing 1s steps(20) infinite',
				'fade-slide-up': 'fade-slide-up 0.5s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'success-bounce': 'success-bounce 0.6s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
