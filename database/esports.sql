/* Games */
select
    *
from
    `games`
where
    exists (
        select
            *
        from
            `tournaments`
        where
                `games`.`id` = `tournaments`.`game_id`
          and exists (
            select
                *
            from
                `confrontations`
            where
                    `tournaments`.`id` = `confrontations`.`tournament_id`
              and `status` = 'live'
            )
        )



/* Tournaments */
select
    *
from
    `tournaments`
where
        `tournaments`.`game_id` in (1, 3)
  and exists (
    select
        *
    from
        `confrontations`
    where
            `tournaments`.`id` = `confrontations`.`tournament_id`
      and `status` = 'live'
    )

/* Confrontations */
select
    *
from
    `confrontations`
where
        `confrontations`.`tournament_id` in (6, 9, 13, 14, 15, 16)
  and `status` = 'live'

/* Teams */
select
    `teams`.*,
    `confrontation_team`.`confrontation_id` as `pivot_confrontation_id`,
    `confrontation_team`.`team_id` as `pivot_team_id`,
    `confrontation_team`.`position` as `pivot_position`,
    `confrontation_team`.`rating` as `pivot_rating`,
    `confrontation_team`.`result` as `pivot_result`
from
    `teams`
        inner join `confrontation_team` on `teams`.`id` = `confrontation_team`.`team_id`
where
        `confrontation_team`.`confrontation_id` in (21, 23, 25, 26, 27, 28)
