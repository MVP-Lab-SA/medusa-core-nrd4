import { DocumentText, ArrowDownTray, Printer } from "@medusajs/icons"
import { Button } from "./button"

interface OrderItem {
  title: string
  quantity: number
  price: string
}

interface OrderInvoiceProps {
  orderId: string
  orderDate: string
  items: OrderItem[]
  subtotal: string
  shipping: string
  tax: string
  total: string
  billingAddress: {
    name: string
    line1: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  shippingAddress?: {
    name: string
    line1: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  companyInfo?: {
    name: string
    address: string
    taxId?: string
  }
  onDownload?: () => void
  onPrint?: () => void
}

export function OrderInvoice({
  orderId,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  total,
  billingAddress,
  shippingAddress,
  companyInfo = {
    name: "CityOS Store",
    address: "123 Smart City Ave, Tech District, CA 94105",
    taxId: "US123456789"
  },
  onDownload,
  onPrint
}: OrderInvoiceProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header Actions */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <DocumentText className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Invoice #{orderId}</h3>
        </div>
        <div className="flex gap-2">
          {onPrint && (
            <Button variant="outline" size="sm" onClick={onPrint}>
              <Printer className="w-4 h-4 mr-1" />
              Print
            </Button>
          )}
          {onDownload && (
            <Button variant="outline" size="sm" onClick={onDownload}>
              <ArrowDownTray className="w-4 h-4 mr-1" />
              Download PDF
            </Button>
          )}
        </div>
      </div>

      {/* Invoice Content */}
      <div className="p-6" id="invoice-content">
        {/* Company & Order Info */}
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{companyInfo.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{companyInfo.address}</p>
            {companyInfo.taxId && (
              <p className="text-sm text-gray-600">Tax ID: {companyInfo.taxId}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">INVOICE</p>
            <p className="text-sm text-gray-600 mt-1">Order #{orderId}</p>
            <p className="text-sm text-gray-600">Date: {orderDate}</p>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Bill To</h4>
            <p className="font-medium text-gray-900">{billingAddress.name}</p>
            <p className="text-sm text-gray-600">{billingAddress.line1}</p>
            <p className="text-sm text-gray-600">
              {billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}
            </p>
            <p className="text-sm text-gray-600">{billingAddress.country}</p>
          </div>
          {shippingAddress && (
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Ship To</h4>
              <p className="font-medium text-gray-900">{shippingAddress.name}</p>
              <p className="text-sm text-gray-600">{shippingAddress.line1}</p>
              <p className="text-sm text-gray-600">
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
              </p>
              <p className="text-sm text-gray-600">{shippingAddress.country}</p>
            </div>
          )}
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="text-center py-3 text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="text-right py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="py-3 text-gray-900">{item.title}</td>
                <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                <td className="py-3 text-right text-gray-900">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">{subtotal}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">{shipping}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">{tax}</span>
            </div>
            <div className="flex justify-between py-3 border-t border-gray-200 font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{total}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Thank you for your business!</p>
          <p className="mt-1">Questions? Contact us at support@cityos.store</p>
        </div>
      </div>
    </div>
  )
}
