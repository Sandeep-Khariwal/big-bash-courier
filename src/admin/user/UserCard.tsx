import { Card, Flex, Stack, Text, Box } from "@mantine/core";
import { UserData } from "./AppUsers";
import { SetStateAction } from "react";

const UserCard = (props: {
  user: UserData;
  setSelectedUserId: React.Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <Card
      shadow="md"
      p="lg"
      radius="md"
      style={{
        background: "linear-gradient(135deg, #4da6cf 10%, #ec4899 90%)",
        color: "white",
      }}
    >
      <Flex align="center" justify="space-between">
        <Stack>
          <Text size="lg" fw={700}>
            {props.user.name}
          </Text>
          <Text size="sm" style={{ opacity: 0.9 }}>
            ✉ {props.user.email}
          </Text>
        </Stack>

        <Flex direction={"column"} align={"end"} justify={"center"}>
          <Box
            p="xs"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            <Text size="sm" fw={600}>
              📦 Parcels: {props.user.parcel.length}
            </Text>
          </Box>
          <Text
            fz={12}
            ff={"Poppins"}
            fw={400}
            c={"white"}
            mt={10}
            style={{ cursor: "pointer" }}
            onClick={() => props.setSelectedUserId(props.user.parcel)}
          >
            view all parcel
          </Text>
        </Flex>
      </Flex>

      <Box mt="md">
        <Text size="sm" fw={600}>
          🎟 Discount: {props.user.discount}%
        </Text>
      </Box>
    </Card>
  );
};

export default UserCard;
