import { useRouter } from "next/router";

export default () => {
    return <iframe src={`https://ph-switchboard-nginx-prod-c84ebf8c6e3b.herokuapp.com/explorer`} height="100%" width="100%" className="min-h-[calc(100vh-63px)]" />;
};
