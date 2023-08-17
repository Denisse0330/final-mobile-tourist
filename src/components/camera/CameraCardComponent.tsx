import { Card, Text, Image, Badge, rem } from "@mantine/core";
import { Moment } from "./CameraForm";
import { IconTag } from "@tabler/icons-react";
export const CameraCardComponent = ({ moment }: { moment: Moment }) => {
  return (
    <Card withBorder shadow="sm">
      <Card.Section p={rem(8)}>
        <Text fw={"bold"} color="cyan.7">
          {moment.location}
        </Text>
      </Card.Section>
      <Card.Section p={rem(8)}>
        <Image
          src={moment.photo}
          alt={moment.location}
          mah={350}
          maw={350}
          sx={{
            figure: {
              div: {
                img: {
                  width: `350px !important`,
                  height: `350px !important`,
                },
              },
            },
          }}
        />
        <Text fw={500} color="yellow.8">
          {new Date(Number(moment.date)).toISOString()}
        </Text>
      </Card.Section>
      <Card.Section p={rem(8)}>
        <Text fw={700} color="cyan.7" mb={rem(2)}>
          Emociones:{" "}
        </Text>
        {moment.tags.map((tag) => {
          return (
            <Badge
              variant="filled"
              color="cyan"
              mr={2}
              leftSection={
                <IconTag
                  size={"18"}
                  style={{
                    position: "relative",
                    top: "3px",
                  }}
                />
              }
            >
              {tag}
            </Badge>
          );
        })}
      </Card.Section>
    </Card>
  );
};
