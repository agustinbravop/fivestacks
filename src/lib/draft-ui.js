const DDRAGON = "https://ddragon.leagueoflegends.com/cdn/16.18.1/img/champion";

export const roles = ["top", "jungle", "mid", "bot", "support"];

export const roleNames = {
  top: "Top",
  jungle: "Jungle",
  mid: "Mid",
  bot: "Bot",
  support: "Support",
};

export const icon = (id) => `${DDRAGON}/${id}.png`;

export const emptyLineup = () => Object.fromEntries(roles.map((role) => [role, null]));
