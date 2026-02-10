import { paymentMethodsData } from "@/lib/constants/payment-methods"

type PaymentMethodInfoProps = {
  provider_id: string;
}

const PaymentMethodInfo = ({ provider_id }: PaymentMethodInfoProps) => {
  return (
    <div className="flex items-center gap-2 text-city-gray">
      <span>{paymentMethodsData[provider_id]?.title || provider_id}</span>
      <span className="text-city-cyan">
        {paymentMethodsData[provider_id]?.icon}
      </span>
    </div>
  )
}

export default PaymentMethodInfo
