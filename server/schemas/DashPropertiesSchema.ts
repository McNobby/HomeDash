import mongoose from 'mongoose';

interface iDashboard {
    title: string;
    description: string;
    image?: string;
    owner: mongoose.Types.ObjectId;
}

const dashboardSchema = new mongoose.Schema<iDashboard>({
    title: String,
    description: String,
    image: String,
    owner: mongoose.Types.ObjectId
})

const Dashboard = mongoose.model<iDashboard>('Dashboard', dashboardSchema);
export default Dashboard; 