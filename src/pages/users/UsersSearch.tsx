import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { ChangeEvent } from "react";
import { useLazySearchUserQuery } from "src/data/api/graphql/queries.generated";
import { debounce } from "src/shared/utils";

export const UsersSearch = () => {
  const [query] = useLazySearchUserQuery();
  const searchUser = debounce(query, 500);

  const handleSearchUser = ({ target }: ChangeEvent<HTMLInputElement>) => {
    searchUser({ searchQuery: target.value });
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
