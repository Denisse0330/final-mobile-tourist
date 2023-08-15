import { Button, Card, Divider, Grid, Text, rem } from "@mantine/core";
import { IconHeartBroken } from "@tabler/icons-react";
import { UseMutateFunction } from "@tanstack/react-query";

export const FavoriteCardComponent = ({
  place,
  onRemoveFavorite,
}: {
  place: any;
  onRemoveFavorite: UseMutateFunction<void, unknown, any, unknown>;
}) => {
  return (
    <Grid.Col xs={8} md={6} lg={4} sm={8}>
      <Card shadow="md" withBorder>
        <Card.Section p={rem(4)}>
          <Text color="cyan.8" fw={700}>
            {place.name}
          </Text>
          <Divider mt={8} mb={8} />
          <Text>{place.vicinity}</Text>
        </Card.Section>

        <Card.Section>
          <Button
            fullWidth
            onClick={onRemoveFavorite}
            color="red.8"
            leftIcon={<IconHeartBroken />}
          >
            Quitar de lugares guardados
          </Button>
        </Card.Section>
      </Card>
    </Grid.Col>
  );
};
