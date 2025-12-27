import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
        fontSize: 11,
        color: '#0F172A',
        lineHeight: 1.6,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 10,
        marginBottom: 40,
    },
    headerText: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: 'bold',
    },
    h1: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        lineHeight: 1.2,
    },
    h2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    h3: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#334155',
    },
    text: {
        marginBottom: 10,
    },
    muted: {
        color: '#64748B',
    },
    bold: {
        fontWeight: 'bold',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        marginVertical: 20,
    },
    section: {
        marginBottom: 30,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 50,
        right: 50,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 8,
        color: '#94A3B8',
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginVertical: 15,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: 8,
        fontSize: 10,
    },
    tableHeaderCell: {
        margin: 8,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#64748B',
        textTransform: 'uppercase',
    },
    callout: {
        padding: 15,
        backgroundColor: '#F8FAFC',
        borderLeftWidth: 3,
        borderLeftColor: '#10B981',
        marginVertical: 15,
    },
    flowBox: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        width: 200,
        alignItems: 'center',
        marginVertical: 5,
    },
    flowArrow: {
        textAlign: 'center',
        fontSize: 12,
        color: '#94A3B8',
        marginVertical: 2,
    },
    primaryConstraint: {
        borderColor: '#10B981',
        borderWidth: 2,
        backgroundColor: '#ECFDF5',
    }
});
