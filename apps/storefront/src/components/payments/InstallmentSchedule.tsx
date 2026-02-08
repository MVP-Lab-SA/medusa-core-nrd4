import { Check, Clock, AlertCircle, Calendar } from "lucide-react";

export interface Installment {
  id: string;
  number: number;
  amount: number;
  currency: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue" | "upcoming";
  paidDate?: string;
}

interface InstallmentScheduleProps {
  installments: Installment[];
  totalAmount: number;
  currency: string;
  onPayNow?: (installmentId: string) => void;
}

export function InstallmentSchedule({
  installments,
  totalAmount,
  currency,
  onPayNow,
}: InstallmentScheduleProps) {
  const paidAmount = installments
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const remainingAmount = totalAmount - paidAmount;
  const progress = (paidAmount / totalAmount) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusIcon = (status: Installment["status"]) => {
    switch (status) {
      case "paid":
        return <Check className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "upcoming":
        return <Calendar className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Installment["status"]) => {
    const styles = {
      paid: "bg-green-100 text-green-700",
      pending: "bg-blue-100 text-blue-700",
      overdue: "bg-red-100 text-red-700",
      upcoming: "bg-gray-100 text-gray-600",
    };
    const labels = {
      paid: "Paid",
      pending: "Due",
      overdue: "Overdue",
      upcoming: "Upcoming",
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      {/* Progress Header */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Payment Progress</span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(paidAmount)} of {formatCurrency(totalAmount)}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {formatCurrency(remainingAmount)} remaining
        </p>
      </div>

      {/* Installment List */}
      <div className="divide-y">
        {installments.map((installment, index) => (
          <div
            key={installment.id}
            className={`p-4 flex items-center justify-between ${
              installment.status === "overdue" ? "bg-red-50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Status Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  installment.status === "paid"
                    ? "bg-green-100"
                    : installment.status === "overdue"
                    ? "bg-red-100"
                    : installment.status === "pending"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                {getStatusIcon(installment.status)}
              </div>

              {/* Installment Details */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    Payment {installment.number}
                  </span>
                  {getStatusBadge(installment.status)}
                </div>
                <p className="text-sm text-gray-500">
                  {installment.status === "paid" && installment.paidDate
                    ? `Paid on ${formatDate(installment.paidDate)}`
                    : `Due ${formatDate(installment.dueDate)}`}
                </p>
              </div>
            </div>

            {/* Amount & Action */}
            <div className="text-right">
              <div className="font-medium text-gray-900">
                {formatCurrency(installment.amount)}
              </div>
              {(installment.status === "pending" || installment.status === "overdue") &&
                onPayNow && (
                  <button
                    onClick={() => onPayNow(installment.id)}
                    className={`text-sm font-medium mt-1 ${
                      installment.status === "overdue"
                        ? "text-red-600 hover:text-red-700"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    Pay Now
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Next payment due</span>
          <span className="font-medium text-gray-900">
            {(() => {
              const nextPayment = installments.find(
                (i) => i.status === "pending" || i.status === "overdue"
              );
              return nextPayment ? formatDate(nextPayment.dueDate) : "All paid";
            })()}
          </span>
        </div>
      </div>
    </div>
  );
}
