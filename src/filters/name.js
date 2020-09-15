export default function nameFilter (name) {
    const str = name.split('_').join(' ')
    return str[0].toUpperCase() + str.slice(1)
}