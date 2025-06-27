import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';

const DashboardPage = () => {


  return (
    <div>
      <TopBar/>
      <Navbar />
      <main >
        <h1>Dashboard</h1>
        <p style={{color: 'black'}}>Aquí se mostrará el contenido de la sección de dashboard.</p>
      </main>
    </div>
  );
};

export default DashboardPage; 