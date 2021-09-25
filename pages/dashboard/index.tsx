import DashTable from "../../components/Dashboard/DashTable";
import NaviLayout from "../../components/Layouts/NaviLayout";

const Dashboard = (props) => {
  return (
    <NaviLayout>
      <DashTable query={props.query} />
    </NaviLayout>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
    },
  };
}
