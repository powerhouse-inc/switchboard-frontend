import { useRouter } from "next/router";

export default () => {
    return <iframe src={`https://ph-switchboard-api-prod-2f0358a27fa5.herokuapp.com/explorer`} height="100%" width="100%" className="min-h-[calc(100vh-63px)]" />;
};
