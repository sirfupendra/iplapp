import React from "react";
import Card from "./Card";

function PlayerCard({ player, onClick }) {
  return (
    <Card className="cursor-pointer" onClick={() => onClick(player.name)}>
      <Card.Header>
        <img
          src={player.imageUrl}
          alt={player.name}
          className="w-full h-40 object-cover"
        />
      </Card.Header>
      <Card.Content>
        <Card.Title className="text-center">{player.name}</Card.Title>
      </Card.Content>
    </Card>
  );
}

export default PlayerCard;
