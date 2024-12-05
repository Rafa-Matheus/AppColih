import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import root, { formInputAddonStyles, formInputStyles } from './StaticStyles'

const CurrencyInput = styled(NumberFormat)({
    paddingRight: root.borderRadius,
    borderRadius: root.borderRadius,
    ...formInputStyles,
    ...formInputAddonStyles
})

export default (props) => {
    return <CurrencyInput
        type="tel"
        className="form-input"
        prefix={`${process.env.currencySymbol} `}
        decimalSeparator=","
        thousandSeparator="."
        decimalScale={2}
        fixedDecimalScale={true}
        {...props} />
}