export const generateTrackingId = () => {
    const time = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000 + 100).toString();
    return `pcl-${time}-${randomNum}`;
};
