export default function PostTileContainer({children}: {children: React.ReactNode}) {
  return <div className="grid md:grid-cols-3 grid-cols-1 w-full">{children}</div>
}