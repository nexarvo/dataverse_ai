"use client";

export function DataTable() {
  const data = [
    {
      product: "Product A",
      sales: "$12,450",
      growth: "+15.2%",
      status: "Active",
    },
    {
      product: "Product B",
      sales: "$8,920",
      growth: "+8.7%",
      status: "Active",
    },
    {
      product: "Product C",
      sales: "$6,340",
      growth: "-2.1%",
      status: "Inactive",
    },
    {
      product: "Product D",
      sales: "$9,180",
      growth: "+12.3%",
      status: "Active",
    },
  ];

  return (
    <div className="w-full h-full bg-white/10 rounded-lg p-4 border border-white/20">
      <h3 className="text-white font-medium mb-4">Top Products</h3>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-white/5 rounded"
          >
            <div className="flex-1">
              <div className="text-white text-sm font-medium">
                {item.product}
              </div>
              <div className="text-white/60 text-xs">{item.sales}</div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs ${
                  item.growth.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {item.growth}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
