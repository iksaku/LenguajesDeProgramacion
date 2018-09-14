fibonacci :: Integer -> Integer
fibonacci n
    | n < 0     = 0
    | n == 0    = 1
    | otherwise = (fibonacci (n - 1)) + (fibonacci (n - 2))

goldenRation :: Integer -> Float
goldenRation n
    | n <= 0    = 0
    | otherwise = fromIntegral n * fromIntegral (fibonacci (n - 1)) / fromIntegral (fibonacci n)

test :: Integer -> IO()
test n
    | n <= 0    = return ()
    | otherwise = do
        test (n - 1)
        putStrLn $ "Diameter of " ++ show n ++ " is: " ++ show (goldenRation n)

main = test 10