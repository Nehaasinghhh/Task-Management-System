function Navbar({ onLogout }) {
  return (
    <nav>
      <h2>Task Manager</h2>

      <button onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;