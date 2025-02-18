import Image from "next/image";
import styles from "./page.module.css";
import MainHeader from "./_components/MainHeader";

export default function Home() {
  return (
    <>
    <MainHeader />
    <div class="mainContent">
      <h2>Welcome to FellowTools!</h2>
      <div className="fullSeparator"></div>
      <p>This site contains a variety of unofficial tools to improve your experience playing Fellowship, the #1 MODA game. Check out the navigation bar on the top left to
        get started! We currently have an ability list and talent calculator for all heroes, alongside a dungeon routing tool that may feel familiar
        to players of certain other MMORPGs!
      </p>
      <p>
        We will be adding new features regularly, with the goal of having a fully-featured toolkit available by the time the game
        launches on Steam (Fellowship is currently slated for a 2025 release). Our short list of high-priority features includes loot
        tables for each dungeon, full descriptions for all gems and set bonuses, and the ability to add custom notes to saved routes!
        Long term, we would like to add support for theorycrafting tools such as simulations and enemy damage analysis.
      </p>
      <p>
        If you enjoy this site and want to get involved, consider supporting us on Patreon or buying us a coffee. These tools are and
        will always remain free, but server hosting isn't. Your support will help us to make this site the best it can be!
      </p>
    </div>
      
    </>
  );
}
