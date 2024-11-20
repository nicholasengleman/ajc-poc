import { useMemo } from 'react';

const useTeamRecord = (sport, teamRankings) =>
  useMemo(() => {
    let teamName = 'N/A';
    let win = 0;
    let loss = 0;
    let rank = 'N/A';
    let region = 'N/A';

    if (sport === 'mlb') {
      const record = teamRankings?.league?.season?.leagues
        ?.find((league) => league?.alias === 'NL')
        ?.divisions?.find((division) => division?.alias === 'E')
        ?.teams?.find((team) => team?.name === 'Braves');

      win = record?.win;
      loss = record?.loss;
      rank = record?.rank?.division;
      teamName = 'Atlanta Braves';
      region = 'NL East';
    } else if (sport === 'mls') {
      const record = teamRankings
        ?.find((conference) => conference?.name === 'Eastern Conference')
        ?.standings?.find(
          (team) => team?.competitor?.name === 'Atlanta United FC',
        );

      win = record?.win;
      loss = record?.loss;
      rank = record?.rank;
      teamName = 'Atlanta United FC';
      region = 'Eastern Conf.';
    } else if (sport === 'nfl') {
      const record = teamRankings?.conferences
        ?.find((conference) => conference?.name === 'NFC')
        ?.divisions?.find((division) => division?.alias === 'NFC_SOUTH')
        ?.teams?.find((team) => team?.name === 'Falcons');

      win = record?.wins;
      loss = record?.losses;
      rank = record?.rank?.division;
      teamName = 'Atlanta Falcons';
      region = 'NFC South';
    } else if (sport === 'nba') {
      const record = teamRankings
        ?.find((conference) => conference?.alias === 'SOUTHEAST')
        ?.teams?.find((team) => team?.name === 'Hawks');

      win = record?.wins;
      loss = record?.losses;
      rank = record?.calc_rank?.div_rank;
      teamName = 'Atlanta Hawks';
      region = 'Eastern Conf.';
    }

    return { teamName, win, loss, rank, region };
  }, [sport, teamRankings]);

export default useTeamRecord;
