import java.text.SimpleDateFormat
import java.text.ParseException
import java.util.concurrent.TimeUnit
import java.time._
import scala.io.StdIn.readLine

object LivedTime {
    def dateFromInput(format: String, example: (String, String), identityInText: String = ""): Instant = {
        var date: Option[Instant] = None

        while (date.isEmpty) {
            try {
                var idStr: String = " "
                if (identityInText.length > 0) {
                    idStr = " " + identityInText.trim() + " "
                }

                println("Por favor ingrese la fecha" + idStr + "en el siguiente formato:\n\t" + format
                        + "\nEjemplo: Para ingresar la fecha '" + example._1 + "' se escribiria:"
                        + "\n\t'" + example._2 + "'")
                val input = readLine("-> ")
                
                date = ((new SimpleDateFormat(format)).parse(input)).toInstant
                val zdt = ZonedDateTime.ofInstant(date, ZoneId.of("America/Monterrey"))
                val dtf = DateTimeFormatter
                            .ofLocalizedDateTime(FormatStyle.FULL, FormatStyle.SHORT)
                            .withLocale(new Locale("es", "MX"))
                
                println("\n'" + zdt.format(dtf) + "'")
                if (readLine("¿Es esta fecha correcta? (S/n): ").toLowerCase() == "n") {
                    date = None
                }
            } catch {
                case e: ParseException => {
                    if (e.getMessage.length > 0) {
                        println("\n[Error] Fecha invalida, intentelo denuevo...")
                    } else {
                        println()
                    }
                    date = Some(dateFromInput(format, example, identityInText))
                }
            }
        }

        return date.get
    }

    def getDates(format: String, example: (String, String)): (Date, Date) = {
        val birthday = dateFromInput(format, example, "de nacimiento")
        var destiny: Option[Date] = None

        while (destiny.isEmpty) {
            if (readLine("\n¿Desea utilizar la fecha actual como fecha de destino? (S/n): ").toLowerCase() == "n") {
                destiny = Some(dateFromInput(format, example, "de destino"))
            } else {
                destiny = Some(new Date)
            }

            if (destiny.get.getTime() < birthday.getTime()) {
                println("\n[Error] La fecha de destino no puede ser antes que la fecha de nacimiento, intentelo denuevo...")
                destiny = None
            }
        }
        
        return (birthday, destiny.get)
    }

    def livedHours() {
        val format = "yyyy-MM-dd HH"
        val example = ("3 de Marzo de 1999 con 5 horas", "1999-03-03 05")

        val dates = getDates(format, example)

        val hours = TimeUnit.MILLISECONDS.toHours(dates._2.getTime() - dates._1.getTime())

        println("\nHoras que ha vivido: " + hours.toString())
    }

    def livedHoursSecondsMinutes() {
        val format = "yyyy-MM-dd HH:mm:ss"
        val example = ("3 de Marzo de 1999 con 5 horas, 3 minutos y 2 segundos", "1999-03-03 05:03:02")

        //val dates = getDates(format, example)
        val dates = (
                        (new SimpleDateFormat(format)).parse("1999-03-03 00:00:00"),
                        (new SimpleDateFormat(format)).parse("2018-10-03 15:36:12")
                    )
        
        val difference = dates._2.getTime() - dates._1.getTime()
        val hours = TimeUnit.MILLISECONDS.toHours(difference)
        val minutes = TimeUnit.MILLISECONDS.toMinutes(difference) - TimeUnit.HOURS.toMinutes(hours)
        val seconds = TimeUnit.MILLISECONDS.toSeconds(difference) - TimeUnit.HOURS.toSeconds(hours) - TimeUnit.MINUTES.toSeconds(minutes)

        println("\nTiempo que ha vivido: %d horas, %d minutos y %d segundos".format(hours, minutes, seconds))
    }

    def main(args: Array[String]) {
        livedHoursSecondsMinutes()
    }
}