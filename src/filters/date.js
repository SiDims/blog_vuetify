export default function dateFilter (value) {
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }
    
    if (value) {
        return new Intl.DateTimeFormat('en-GB', options).format(new Date(value))
    }
}