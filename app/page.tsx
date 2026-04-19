"use client";

import { useState } from "react";

export default function NetWorthPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");

    const formData = new FormData(e.currentTarget);
    const fields: Record<string, string> = {};
        fields["age"] = "";
    fields["cash_savings"] = "";
    fields["stocks_bonds"] = "";
    fields["retirement_accounts"] = "";
    fields["real_estate"] = "";
    fields["crypto"] = "";
    fields["other_assets"] = "";
    fields["total_debt"] = "";
    formData.forEach((value, key) => {
      fields[key] = value as string;
    });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          prompt: "Generate a comprehensive financial report for this scenario. Respond in well-structured markdown.",
        }),
      });

      const data = await res.json();
      if (data.result) {
        setResult(data.result);
      } else {
        setError(data.error || "Generation failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
            AI Net Worth Tracker & Asset Allocation Report
          </h1>
          <p className="text-gray-400 text-lg">Calculate net worth, asset allocation, and generate a wealth progress report with diversification recommendations.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8 mb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Age</label>
        <input
          type="text"
          name="age"
          placeholder="Enter value..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Cash Savings</label>
        <input
          type="text"
          name="cash_savings"
          placeholder="Enter value..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Stocks Bonds</label>
        <input
          type="text"
          name="stocks_bonds"
          placeholder="Enter value..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Retirement Accounts</label>
        <input
          type="text"
          name="retirement_accounts"
          placeholder="Enter value..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Real Estate</label>
        <input
          type="text"
          name="real_estate"
          placeholder="Enter value..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Crypto</label>
        <input
          type="text"
          name="crypto"
          placeholder="Enter value..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Other Assets</label>
        <input
          type="text"
          name="other_assets"
          placeholder="Enter value..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Total Debt</label>
        <input
          type="text"
          name="total_debt"
          placeholder="Enter value..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all
              bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg shadow-indigo-900/30`}
          >
            {loading ? "Generating Report..." : "Generate Report"}
          </button>
        </form>

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-4 mb-8 text-red-300 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-indigo-400">Generated Report</h2>
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="text-sm text-gray-400 hover:text-white px-3 py-1 rounded border border-gray-700 transition-colors"
              >
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono leading-relaxed bg-gray-800/50 p-4 rounded-xl overflow-x-auto">
              {result}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
