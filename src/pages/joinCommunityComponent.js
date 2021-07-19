import "./joinCommunityComponent.css";
import discord from "../images/discord.png";

const JoinCommunity = () => {
  return (
    <div className="joinCommunity">
      <h1 className="title">Welcome to BOWE!!!</h1>
      <h3>
        An inclusive Community where together we can learn, grow, build, share,
        network and experience Virtual College!
      </h3>
      <br />
      <br />
      <h3>Click on the link to join👇🏻</h3>
      <a href="https://discord.gg/NHzkNFuGCs">
        <img src={discord} alt="discord-bowe" />
      </a>
      <h3>OR</h3>
      <a className="discord-link" href="https://discord.gg/NHzkNFuGCs">
        https://discord.gg/NHzkNFuGCs
      </a>
    </div>
  );
};

export default JoinCommunity;
