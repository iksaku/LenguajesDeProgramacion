fibonacci :: Integer -> Integer
fibonacci n
    | n < 0     = 0
    | n == 0    = 1
    | otherwise = (fibonacci (n - 1)) + (fibonacci (n - 2))

goldenRatio :: Integer -> Float -> Integer -> Float
goldenRatio currentSegment previousDiameter totalSegments
    | currentSegment <= 0 || currentSegment > totalSegments =
        0
    | currentSegment == totalSegments =
        previousDiameter
    | otherwise =
        previousDiameter * fromIntegral (fibonacci currentSegment) / fromIntegral (fibonacci (currentSegment + 1))

test :: Integer -> Float -> Integer -> IO()
test currentSegment previousDiameter totalSegments
    | currentSegment <= 0    = return ()
    | otherwise = do
        let diameter = goldenRatio currentSegment previousDiameter totalSegments
        putStrLn $ "Diameter of segment " ++ show currentSegment ++ " is: " ++ show diameter
        test (currentSegment - 1) diameter totalSegments

main = test 9 70 9