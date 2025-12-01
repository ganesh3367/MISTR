export const theme = {
    colors: {
        primary: '#4F46E5', // Indigo-600
        primaryLight: '#818CF8', // Indigo-400
        secondary: '#64748B', // Slate-500
        background: '#F8FAFC', // Slate-50
        surface: '#FFFFFF',
        text: '#0F172A', // Slate-900
        textSecondary: '#475569', // Slate-600
        border: '#E2E8F0', // Slate-200
        success: '#10B981', // Emerald-500
        danger: '#EF4444', // Red-500
        warning: '#F59E0B', // Amber-500
        info: '#3B82F6', // Blue-500
        accent: '#8B5CF6', // Violet-500
        cardBg: '#FFFFFF',
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        round: 9999,
    },
    typography: {
        h1: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
        h2: { fontSize: 26, fontWeight: '700', letterSpacing: -0.5 },
        h3: { fontSize: 20, fontWeight: '600' },
        body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
        caption: { fontSize: 14, fontWeight: '400', color: '#64748B' },
        button: { fontSize: 16, fontWeight: '600' },
    },
    shadows: {
        default: {
            shadowColor: '#64748B',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
        },
        hover: {
            shadowColor: '#4F46E5',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 6,
        },
        soft: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: 8,
            elevation: 2,
        }
    },
};
