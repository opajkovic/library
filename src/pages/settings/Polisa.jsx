import PageTitle from "../../components/pageTitle/PageTitle";
import Menu from "./layouts/menu/Menu";
import PolisaList from "./layouts/PolisaList/PolisaList";

export default function Polisa() {
  return (
    <div>
      <PageTitle title="Settings" />
      <Menu selectedSettings={"polisa"} />
      <PolisaList />
    </div>
  );
}
