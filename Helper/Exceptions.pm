package Exceptions::Base;
use Moose;
extends qw(Moose::Exception);

package Exceptions::InvalidNumber;
use Moose;
extends "Exceptions::Base";

package Exceptions::InsufficientArguments;
use Moose;
extends "Exceptions::Base";

package Exceptions::InvalidMatrices;
use Moose;
extends "Exceptions::Base";

package Exceptions::InvalidTemperatureScale;
use Moose;
extends "Exceptions::Base";

package Exception::KeyboardInterrupt;
use Moose;
extends "Exceptions::Base";

package Exceptions::MatrixMultiplicationSize;
use Moose;
extends "Exceptions::Base";

package Exceptions::MatrixSummationSize;
use Moose;
extends "Exceptions::Base";

package Exceptions::NumberOutOfRange;
use Moose;
extends "Exceptions::Base";

package Exceptions::RepeatedNumber;
use Moose;
extends "Exceptions::Base";