SELECT
  `family_funding_hub_db`.`income`.`UserID` AS `UserID`,
  date_format(
    `family_funding_hub_db`.`income`.`Date_created`,
    '%Y-%m'
  ) AS `month`,
  sum(`family_funding_hub_db`.`income`.`Total`) AS `monthlyIncome`
FROM
  `family_funding_hub_db`.`income`
GROUP BY
  `family_funding_hub_db`.`income`.`UserID`,
  `month`