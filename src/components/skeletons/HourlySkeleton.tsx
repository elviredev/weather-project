import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

type Props = {}

export default function HourlySkeleton({ }: Props) {
    return (
        <Card title="Prévisions horaires (48h)" childrenClassName="flex gap-6 overflow-x-scroll">

            {Array.from({length: 48}).map((_, index) => (
                <div key={index} className="flex flex-col gap-2 items-center p-2">
                    <Skeleton className="w-10 h-6" />
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="w-8 h-6" />
                </div>
            ))}

        </Card>
    )
}