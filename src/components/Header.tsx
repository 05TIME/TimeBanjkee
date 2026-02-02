interface HeaderProps {
  username?: string
}

export const Header = ({ username }: HeaderProps) => {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 border-b border-slate-700 px-4 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">TimeBanker</h1>
          <p className="text-xs text-slate-400">Focus to Earn on TON</p>
        </div>
        {username && (
          <div className="text-right">
            <div className="text-sm text-slate-300">{username}</div>
            <div className="text-xs text-slate-500">⏳ Ready to focus</div>
          </div>
        )}
      </div>
    </div>
  )
}
