import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { ChangeEvent } from "react";
import { useLazySearchUserQuery } from "src/data/api/graphql/queries.generated";

export const UsersSearch = () => {
  const [searchUser] = useLazySearchUserQuery();

  const handleSearchUser = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      searchUser({ searchQuery: target.value });
    }, 500);
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search user"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
        onChange={handleSearchUser}
      />
    </Card>
  );
};
