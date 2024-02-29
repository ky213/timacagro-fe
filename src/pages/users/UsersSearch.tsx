import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { ChangeEvent, useEffect, useRef } from "react";
import { useLazySearchUserQuery } from "src/data/api/graphql/queries.generated";

export const UsersSearch = () => {
  const [searchUser] = useLazySearchUserQuery();
  const count = useRef<number>(0);
  const timer = useRef<NodeJS.Timer>();

  const handleSearchUser = ({ target }: ChangeEvent<HTMLInputElement>) => {
    count.current = 0;

    if (!timer.current)
      timer.current = setInterval(() => {
        count.current += 1;
        if (count.current > 6) {
          searchUser({ searchQuery: target.value });
          count.current = 0;
          clearInterval(timer.current);
          timer.current = undefined;
        }
      }, 100);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

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
