import { useRouter } from "next/router";

export default () => {
    const router = useRouter();

    return <iframe src={`https://ph-switchboard-api-prod-2f0358a27fa5.herokuapp.com/explorer/${router.query.driveId}`} height="100%" width="100%" className="min-h-[calc(100vh-63px)]" />;
};
