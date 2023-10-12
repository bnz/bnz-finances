const moneySymbol = "€"

export function sumDecorator(value: number) {
    const [a, b] = value.toFixed(2).split(".")

    return (
        <>
            <strong>{a}</strong>
            {","}
            <span>{b}</span>
            {moneySymbol}
        </>
    )
}
