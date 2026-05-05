import { useNavigate } from "react-router-dom";

type Activity = {
    id: string;
    name: string;
    distance: number;
    duration: number;
    tss: number;
};

type Props = {
    activities: Activity[];
};

const ActivityList = ({ activities }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Rides</h2>

            <div className="space-y-3">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex justify-between items-center border-b pb-2"
                        onClick={() => navigate(`/activities/${activity.id}`)}
                    >
                        <div>
                            <p className="font-medium">{activity.name}</p>
                            <p className="text-sm text-gray-500">
                                {(activity.distance / 1000).toFixed(1)} km •{" "}
                                {(activity.duration / 60).toFixed(0)} min
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-500">TSS</p>
                            <p className="font-semibold">
                                {Math.round(activity.tss)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityList;