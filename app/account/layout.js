import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="flex flex-1 gap-8">
      <SideNavigation />
      <div className="pt-2">
        {children}
      </div>
    </div>
  )
} 