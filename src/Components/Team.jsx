function Team() {
  return (
    <div className="team">
      <h1>Team</h1>
      <div className="team-admin-container admins">
        <img src="/images/king.png" alt="admins icon" height={40} />
        <div>
          <p className="title">Total Admins</p>
          <p>6</p>
        </div>
      </div>
      <div className="team-admin-container teams">
        <img src="/images/members.png" alt="team icon" height={40} />
        <div>
          <p className="title">Team Members</p>
          <p>12</p>
        </div>
      </div>
    </div>
  );
}

export default Team;
