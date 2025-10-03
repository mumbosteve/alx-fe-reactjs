import UserProfile from './UserProfile';

function App() {
  return (
    <div>
      <h1>User Profile Example</h1>
      <UserProfile 
        name="Alice" 
        age="25" 
        bio="Loves hiking and photography" 
      />
    </div>
  );
}

export default App;
