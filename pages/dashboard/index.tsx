import { useEffect } from "react";
import DashTable from "../../components/Dashboard/DashTable";
import NaviLayout from "../../components/Layouts/NaviLayout";
import { LoginAction } from "../../context/actions";
import { useAuthDispatch, useAuthState } from "../../context/context";

const Dashboard = (props) => {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    LoginAction(dispatch, props.query.role);
  }, [props.query.role]);

  return (
    <NaviLayout>
      <DashTable {...props} />
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
