import Text.Read

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

recursiveCalculate :: Integer -> Float -> Integer -> IO()
recursiveCalculate currentSegment previousDiameter totalSegments
    | currentSegment <= 0    = return ()
    | otherwise = do
        let diameter = goldenRatio currentSegment previousDiameter totalSegments
        putStrLn $ "Diametro del segmento " ++ show currentSegment ++ ": " ++ show diameter
        recursiveCalculate (currentSegment - 1) diameter totalSegments

try_int :: String -> IO Integer
try_int prompt = do
    putStr prompt
    input <- getLine
    case readMaybe input :: Maybe Integer of
        Just x -> return x
        Nothing -> putStrLn "\n[Error] Numero invalido, por favor intentelo denuevo." >> try_int prompt

try_float :: String -> IO Float
try_float prompt = do
    putStr prompt
    input <- getLine
    case readMaybe input :: Maybe Float of
        Just x -> return x
        Nothing -> putStrLn "\n[Error] Numero invalido, por favor intentelo denuevo." >> try_float prompt

main = do
    segment <- try_int "Por favor especifique el numero de segmento deseado: "
    diameter <- try_float "Por favor especifique el diametro del segmento actual: "
    putStrLn ""
    recursiveCalculate segment diameter segment