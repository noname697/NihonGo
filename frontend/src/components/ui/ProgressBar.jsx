export const ProgressBar = ({value = 0}) => {
    const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100)

    return (
        <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full rounded-full bg-nihon-red transition-all" style={{width: `${safeValue}%`}} />
        </div>
    )
}