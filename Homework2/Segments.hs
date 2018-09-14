fibonacci :: Integer -> Integer
fibonacci n
    | n < 0     = 0
    | n == 0    = 1
    | otherwise = (fibonacci (n - 1)) + (fibonacci (n - 2))

goldenRatio :: Integer -> Integer -> Float -> Float
goldenRatio n segment diameter
    | n <= 0 || n > segment     = 0
    | n == segment              = diameter
    | otherwise                 = diameter * fromIntegral (fibonacci n) / fromIntegral (fibonacci (n + 1))

test :: Integer -> Integer -> Float -> IO()
test n segment diameter
    | n <= 0    = return ()
    | otherwise = do
        putStrLn $ "Diameter of segment " ++ show segment ++ " starts with " ++ show diameter ++ " and i = " ++ show n ++ " and got: " ++ show (goldenRatio n segment diameter)
        test (n - 1) segment (goldenRatio n segment diameter)

main = test 9 9 70