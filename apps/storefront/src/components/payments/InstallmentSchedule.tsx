import { Check, Clock, ExclamationCircle, Calendar } from "@medusajs/icons";

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
        return <Check className="w-4 h-4 text-emerald-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-cyan-400" />;
      case "overdue":
        return <ExclamationCircle className="w-4 h-4 text-red-400" />;
      case "upcoming":
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Installment["status"]) => {
    const styles = {
      paid: "bg-emerald-500/20 text-emerald-400",
      pending: "bg-cyan-500/20 text-cyan-400",
      overdue: "bg-red-500/20 text-red-400",
      upcoming: "bg-gray-700 text-gray-400",
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
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      {/* Progress Header */}
      <div className="p-4 bg-gray-800/50 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Payment Progress</span>
          <span className="text-sm font-medium text-white">
            {formatCurrency(paidAmount)} of {formatCurrency(totalAmount)}
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {formatCurrency(remainingAmount)} remaining
        </p>
      </div>

      {/* Installment List */}
      <div className="divide-y divide-gray-800">
        {installments.map((installment, index) => (
          <div
            key={installment.id}
            className={`p-4 flex items-center justify-between ${
              installment.status === "overdue" ? "bg-red-500/10" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Status Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  installment.status === "paid"
                    ? "bg-emerald-500/20"
                    : installment.status === "overdue"
                    ? "bg-red-500/20"
                    : installment.status === "pending"
                    ? "bg-cyan-500/20"
                    : "bg-gray-800"
                }`}
              >
                {getStatusIcon(installment.status)}
              </div>

              {/* Installment Details */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">
                    Payment {installment.number}
                  </span>
                  {getStatusBadge(installment.status)}
                </div>
                <p className="text-sm text-gray-400">
                  {installment.status === "paid" && installment.paidDate
                    ? `Paid on ${formatDate(installment.paidDate)}`
                    : `Due ${formatDate(installment.dueDate)}`}
                </p>
              </div>
            </div>

            {/* Amount & Action */}
            <div className="text-right">
              <div className="font-medium text-white">
                {formatCurrency(installment.amount)}
              </div>
              {(installment.status === "pending" || installment.status === "overdue") &&
                onPayNow && (
                  <button
                    onClick={() => onPayNow(installment.id)}
                    className={`text-sm font-medium mt-1 ${
                      installment.status === "overdue"
                        ? "text-red-400 hover:text-red-300"
                        : "text-cyan-400 hover:text-cyan-300"
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
      <div className="p-4 bg-gray-800/50 border-t border-gray-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Next payment due</span>
          <span className="font-medium text-white">
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
