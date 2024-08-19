import SpinnerMini from "@/app/_components/SpinnerMini";

export default function Loading() {
  return (
    <div className="flex items-center justify-center gap-2">
      <SpinnerMini />
      <span>Loading Cabin...</span>
    </div>
  )
}