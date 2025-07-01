import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-20 p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="mb-6">You cancelled your payment. You can try again anytime.</p>
      <Link href="/dashboard" className="text-blue-400 hover:underline">Back to Home</Link>
    </div>
  );
}
