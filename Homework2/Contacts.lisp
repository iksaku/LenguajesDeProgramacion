(defun make-dir (name username email gender)
	(list :name name :username username :email email :gender gender))
	
(defvar *db* nil)
(defun add-dir (cd) (push cd *db*))
		
(defun dump-db ()
	(format t "~{~{~a:~10t~a~%~}~%~}" *db* ) (values))

(defun prompt-read (prompt)
	(format *query-io* "~a: " prompt)
	(force-output *query-io*)
	(read-line *query-io*))
(defun prompt-for-cd ()
	(make-dir
	(prompt-read "name")
	(prompt-read "username")
	(prompt-read "email")
	(prompt-read "gender")))

(defun add-drs ()
	(loop (add-dir (prompt-for-cd))
		(if (not (y-or-n-p "Another? [Y/N]: ")) (return))))

(defun save-db (dbName)
	(with-open-file (out dbName
					:direction :output
					:if-exists :supersede)
		(with-standard-io-Syntax
			(print *db* out))))

(defun load-db (dbName)
	(with-open-file (in dbName)
		(with-standard-io-syntax
			(setf *db* (read in)))))
			
(defun select (selector-fn)
	(remove-if-not selector-fn *bd*))

(defun gender-selector (gender)
	#'(lambda (cd) (equal (getf cd :gender) gender)))

(defun where (&key name username email gender)
	#'(lambda (cd)
		(and		   
			(if name     (equal (getf cd :name) name) t)
			(if username (equal (getf cd :username) username) t)
			(if email    (equal (getf cd :email) email) t)
			(if gender   (equal (getf cd :gender) gender) t))))
			

(defun update (selector-fn &key name username email gender)
	(setf *db* 
		(mapcar
			#'(lambda (row)
				(when (funcall selector-fn row)
					(if name     (setf (getf row :name) name))
					(if username (setf (getf row :username) username))
					(if email    (setf (getf row :email) email))
					(if gender   (setf (getf row :gender) gender)))
					row) *db*)))
		
	
	
	
	
	
	
	
	
	
	
	